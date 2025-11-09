import React, { useEffect, useRef } from 'react';
import { styled } from '../Stitches';

const Canvas = styled('canvas', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: -1,
  pointerEvents: 'none',
});

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 iResolution;
  uniform float iTime;

  #define bayerIntensity 0.7
  #define bayerScale 1.0
  #define errorDiffusionIntensity 0.02
  #define errorDiffusionScale 4.
  #define errorDiffusionIntensity2 0.05
  #define errorDiffusionScale2 1.
  #define colorNum 128.0  // Number of color levels per channel

  // Bayer matrix (4x4)
  float bayer4x4(vec2 position) {
      int x = int(mod(position.x, 4.0));
      int y = int(mod(position.y, 4.0));

      float bayerMatrix[16];
      bayerMatrix[0] = 0.0/16.0; bayerMatrix[1] = 8.0/16.0; bayerMatrix[2] = 2.0/16.0; bayerMatrix[3] = 10.0/16.0;
      bayerMatrix[4] = 12.0/16.0; bayerMatrix[5] = 4.0/16.0; bayerMatrix[6] = 14.0/16.0; bayerMatrix[7] = 6.0/16.0;
      bayerMatrix[8] = 3.0/16.0; bayerMatrix[9] = 11.0/16.0; bayerMatrix[10] = 1.0/16.0; bayerMatrix[11] = 9.0/16.0;
      bayerMatrix[12] = 15.0/16.0; bayerMatrix[13] = 7.0/16.0; bayerMatrix[14] = 13.0/16.0; bayerMatrix[15] = 5.0/16.0;

      return bayerMatrix[y * 4 + x];
  }

  mat2 Rot(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
  }

  vec2 hash(vec2 p) {
      p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
      return fract(sin(p)*43758.5453);
  }

  float noise(in vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f*f*(3.0-2.0*f);
      float n = mix(mix(dot(-1.0+2.0*hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
      dot(-1.0+2.0*hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(-1.0+2.0*hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
      dot(-1.0+2.0*hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
      return 0.5 + 0.5*n;
  }

  // Simulated error diffusion with threshold
  float errorDiffusion(vec2 coord, float value, float scale) {
      vec2 noiseCoord = floor(coord / scale);
      float threshold = fract(sin(dot(noiseCoord, vec2(12.9898, 78.233))) * 43758.5453);

      float error = 0.0;

      for(float y = -1.0; y <= 0.0; y += 1.0) {
          for(float x = -1.0; x <= 1.0; x += 1.0) {
              if(y == 0.0 && x > 0.0) continue;
              vec2 sampleCoord = noiseCoord + vec2(x, y);
              float sampleHash = fract(sin(dot(sampleCoord, vec2(12.9898, 78.233))) * 43758.5453);
              float sampleError = fract(sampleHash * 7.919) - 0.5;

              float weight = 0.0;
              if(x == 1.0 && y == 0.0) weight = 7.0/16.0;
              else if(x == -1.0 && y == 1.0) weight = 3.0/16.0;
              else if(x == 0.0 && y == 1.0) weight = 5.0/16.0;
              else if(x == 1.0 && y == 1.0) weight = 1.0/16.0;

              error += sampleError * weight;
          }
      }

      // Apply threshold with accumulated error
      float adjustedValue = value + error * 0.5;
      return (adjustedValue > threshold) ? 1.0 : 0.0;
  }

  void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      vec2 uv = fragCoord / iResolution.xy;
      float aspectRatio = iResolution.x / iResolution.y;

      vec2 tuv = uv - .6;
      float degree = noise(vec2(iTime*.01, tuv.x*tuv.y));
      tuv.y *= 1./aspectRatio;
      tuv.x *= .4/aspectRatio;
      tuv *= Rot(radians((degree-.5)*1080.+180.));
      tuv.y *= aspectRatio;

      float frequency = 35.;
      float amplitude = 7.;
      float speed = iTime * .5;
      tuv.x += sin(tuv.y*frequency+speed)/amplitude;
      tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);

      vec3 cream = vec3(255, 180, 100) / vec3(255);
      vec3 warmOrange = vec3(60, 20, 20) / vec3(255);
      vec3 rust = vec3(220, 70, 60) / vec3(255);
      vec3 darkGreen = vec3(30, 40, 10) / vec3(255);

      float cycle = sin(iTime * 0.5);
      float t = (sign(cycle) * pow(abs(cycle), 0.6) + 1.) / 2.;

      vec3 color1 = mix(cream, rust, t);
      vec3 color2 = mix(warmOrange, darkGreen, t);

      vec3 layer1 = mix(color2, color1, smoothstep(-.3, .2, (tuv*Rot(radians(-5.))).x));
      vec3 color = mix(layer1, color2, smoothstep(.5, -.3, tuv.y));

      // Calculate brightness
      float brightness = dot(color, vec3(0.299, 0.587, 0.114));

      // Apply error diffusion layer 1 (coarse)
      float dithered1 = errorDiffusion(fragCoord, brightness, errorDiffusionScale);
      float ditherDelta1 = (dithered1 - brightness) * errorDiffusionIntensity;
      color = color + vec3(ditherDelta1);

      // Recalculate brightness after first dither
      brightness = dot(color, vec3(0.299, 0.587, 0.114));

      // Apply error diffusion layer 2 (fine)
      float dithered2 = errorDiffusion(fragCoord, brightness, errorDiffusionScale2);
      float ditherDelta2 = (dithered2 - brightness) * errorDiffusionIntensity2;
      color = color + vec3(ditherDelta2);

      // Apply Bayer dithering to highlights only
      vec2 bayerCoord = fragCoord / bayerScale;
      float bayerValue = bayer4x4(bayerCoord) - 0.5;

      // Recalculate brightness for highlight mask
      brightness = dot(color, vec3(0.299, 0.587, 0.114));
      float highlightMask = smoothstep(0.3, 0.8, brightness);

      // Apply bayer threshold only to highlights
      color = color + bayerValue * bayerIntensity * highlightMask;

      // Quantize to discrete color levels (color banding)
      color.r = floor(color.r * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
      color.g = floor(color.g * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
      color.b = floor(color.b * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);

      gl_FragColor = vec4(color, 1.0);
  }
`;

export const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    // Compile shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      console.error('Failed to create shaders');
      return;
    }

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader compilation error:', gl.getShaderInfoLog(vertexShader));
      return;
    }

    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation error:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    // Link program
    const program = gl.createProgram();
    if (!program) {
      console.error('Failed to create program');
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);
    programRef.current = program;

    // Set up geometry (full-screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');

    // Resize handler
    const handleResize = () => {
      if (!canvas || !gl) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation loop
    const render = () => {
      if (!gl || !program || !canvas) return;

      const currentTime = (Date.now() - startTimeRef.current) / 1000;

      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(iTimeLocation, currentTime);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (gl && program) {
        gl.deleteProgram(program);
      }
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};
