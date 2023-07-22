import Sketch from "react-p5";
import { Fade } from "./Fade";
import { SketchContainer } from "./SketchContainer";
import { useCallback, useState } from "react";

// --- Recursive Rectangles ---------------------------------------------------

const colors = [
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#F1AF5D",
].reverse();

function getColor(index: number) {
  const scaledColor = Math.floor(index / 3);
  if (scaledColor < colors.length) {
    return colors[scaledColor];
  } else {
    return colors[colors.length - 1];
  }
}

const padding = 16;

let rectangles: [number, number, number, number, number][] = [
  [padding, padding, window.innerWidth - padding * 2, 280 - padding * 2, 0],
];

function splitRectangle([x, y, width, height, generation]: [
  number,
  number,
  number,
  number,
  number
]) {
  let splitAxis = "x";

  if (height > 16 && width > 16) {
    splitAxis = Math.random() > 0.5 ? "x" : "y";
  } else if (height < 16) {
    splitAxis = "x";
  } else if (width < 16) {
    splitAxis = "y";
  }

  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

  const g = generation + 1;

  if (splitAxis === "x") {
    const splitPos = x + width / phi;
    const rectA = [x, y, splitPos - x, height, g];
    const rectB = [splitPos, y, x + width - splitPos, height, g];
    return [rectA, rectB];
  } else {
    const splitPos = y + height / phi;
    const rectA = [x, y, width, splitPos - y, g];
    const rectB = [x, splitPos, width, y + height - splitPos, g];
    return [rectA, rectB];
  }
}

const subdivide = () => {
  // pick a random rectangle
  const rectIndex = Math.floor(Math.random() * rectangles.length);

  // split it
  const [rectA, rectB] = splitRectangle(rectangles[rectIndex]) as any;

  // remove the original rectangle
  rectangles.splice(rectIndex, 1);

  // add the new ones
  rectangles.push(rectA, rectB);
};

export const RecursiveRectangles = () => {
  const count = 500;

  const [iteration, setIteration] = useState(0);

  const setup = (p5: any, canvasParentRef: any) => {
    p5.pixelDensity(2);
    p5.createCanvas(p5.windowWidth, 280).parent(canvasParentRef);
    p5.strokeWeight(1);
    p5.noFill();
    p5.frameRate(6);
  };

  const draw = useCallback(
    (p5) => {
      if (iteration < count) {
        subdivide();
        setIteration(iteration + 1);
      }

      rectangles.forEach(([x, y, width, height, generation]) => {
        p5.stroke(getColor(generation));
        p5.rect(x, y, width, height);
      });
    },
    [count, iteration, setIteration]
  );

  return (
    <>
      <Sketch setup={setup} draw={draw} />
    </>
  );
};

/// --- Circle Sketch ---------------------------------------------------------
export const CircleSketch = () => {
  const bump = window.outerWidth > 800 ? 4 : 0;

  // Random number between 5 and 7
  const circleCount = Math.floor(Math.random() * 3) + 4 + bump;

  console.log(bump);

  const circleDiameter = 30;
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  let randomDiameters: number[] = [];
  let fullCirclePositions: boolean[] = [];

  const setup = (p5: any, canvasParentRef: Element) => {
    p5.pixelDensity(8);
    p5.createCanvas(p5.windowWidth, 220).parent(canvasParentRef);
    p5.stroke("#F1AF5D");
    p5.strokeWeight(2);
    p5.noFill();
    p5.smooth();

    for (let i = 0; i < circleCount; i++) {
      randomDiameters[i] = p5.random(0.3, 1.2); // Random scale factor between 0.8 and 1.2
      fullCirclePositions[i] = p5.random() < 0.3;
    }
  };

  const draw = (p5: any) => {
    p5.clear();
    for (let i = 0; i < circleCount; i++) {
      let x = ((i * p5.width * 0.6) / circleCount) * goldenRatio;

      const strokeCircleX = x + (p5.mouseX * (i / 10) - p5.width / 2) * 0.003;

      let diameter =
        circleDiameter * p5.pow(goldenRatio, i) * randomDiameters[i];

      // Clamp the diameter to the canvas height
      diameter = p5.min(diameter, p5.height * 0.98);

      p5.ellipse(strokeCircleX, p5.height / 2, diameter, diameter);

      if (fullCirclePositions[i]) {
        const fullCircleX = x + (p5.mouseX * (i / 10) - p5.width / 2) * 0.007;
        p5.fill("#F1AF5D");
        p5.circle(fullCircleX, p5.height / 2, diameter / 2);
        p5.noFill();
      }

      // Draw a horizontal line through the center of the circles
      p5.line(0, p5.height * 0.5, p5.width, p5.height * 0.5);
    }
  };

  const windowResized = (p5: any) => {
    p5.resizeCanvas(p5.windowWidth, 220);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export const SketchManager = ({
  sketch,
}: {
  sketch: "circles" | "rectangles";
}) => {
  const s = sketch === "circles" ? <CircleSketch /> : <RecursiveRectangles />;

  return (
    <Fade>
      <SketchContainer sketch={sketch}>{s}</SketchContainer>
    </Fade>
  );
};
