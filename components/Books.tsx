import { useEffect, useState } from "react";
import convert from "xml-js";
import { Heading, Link, Text } from "./Typography";
import { styled } from "../Stitches";
import Stack from "./Stack";
import { format, formatDistance } from "date-fns";

type Book = {
  author: string;
  description: string;
  guid: string;
  link: string;
  readDate: string;
  title: string;
};

const rssItemToBook = (item: any): Book => {
  return {
    author: item["dc:creator"]._text,
    description: item.description._text,
    guid: item.guid._text,
    link: item.link._text,
    readDate: item.pubDate._text,
    title: item.title._text,
  };
};

const loadBooksFromRss = (feed: string): Promise<Book[]> => {
  return fetch(feed)
    .then((response) => response.text())
    .then((xmlText) => convert.xml2js(xmlText, { compact: true }))
    .then((data: any) => data.rss.channel.item)
    .then((data) => data.map(rssItemToBook));
};

/** Return a reading goal as a percentage */
const calculateReadingGoal = (books: Book[]) => {
  const goal = 30;
  const books2022 = books.filter(
    (book) => "2022" === format(new Date(book.readDate), "yyyy"),
  ).length;

  return { goal, progress: books2022 };
};

const useBooks = () => {
  const [read, setRead] = useState<Book[]>([]);
  const [currentlyReading, setCurrentlyReading] = useState<Book[]>([]);
  const goal = calculateReadingGoal(read);

  useEffect(() => {
    loadBooksFromRss("https://oku.club/rss/collection/TsUf5").then(setRead);
    loadBooksFromRss("https://oku.club/rss/collection/j7MJU").then(
      setCurrentlyReading,
    );
  }, [setRead, setCurrentlyReading]);

  return { read, currentlyReading, goal };
};

const StyledBookItem = styled("div", {
  textAlign: "center",
  border: "1px solid white",
  borderRadius: "$3",
  padding: "$5",

  boxShadow: "$2",
});

const VerticalRuler = styled("div", {
  width: 2,
  height: 24,
  background: "rgba(255, 255, 255, 0.7)",
  padding: 0,
});

const BookItem = ({ book, current }: { book: Book; current?: boolean }) => {
  const { title, author, readDate } = book;
  return (
    <StyledBookItem>
      <Heading>
        <Link invert href={book.link}>
          {title}
        </Link>
      </Heading>
      <Text>
        {author}. {current ? "Added" : "Finished"}{" "}
        {formatDistance(new Date(book.readDate), new Date())} ago.
      </Text>
    </StyledBookItem>
  );
};

const StyledBookItem2 = styled("div", {
  color: "white",
});

const BookItem2 = ({ book }: { book: Book }) => {
  const { title, author, readDate } = book;

  return (
    <Stack align="center">
      <Heading size="sm">{title}</Heading>
      <StyledBookItem2>{author}</StyledBookItem2>
      <StyledBookItem2>{readDate}</StyledBookItem2>
    </Stack>
  );
};
export const Books = () => {
  const { read, currentlyReading, goal } = useBooks();

  const readSlice = 5;

  return (
    <Stack direction="column">
      <Heading size="lg">Books</Heading>
      <Heading size="md">Recently Finished</Heading>
      {/* <Heading> 2022 reading goal progress: {goal.progress} / {goal.goal}{" "} </Heading> */}

      <Stack spacing="none" direction="column">
        {read.slice(0, 5).map((book, idx) => (
          <>
            <BookItem2 key={book.guid} book={book} />
          </>
        ))}
      </Stack>

      <div>Test</div>

      <Stack
        spacing="none"
        direction={"column"}
        justify="center"
        align="center"
      >
        {read.slice(0, 5).map((book, idx) => (
          <>
            <BookItem key={book.guid} book={book} />
            {idx !== readSlice - 1 && <VerticalRuler />}
          </>
        ))}
      </Stack>
      <Stack direction="row-reverse">
        <Link href="https://oku.club/user/zaymon/collection/read">
          See all on Oku
        </Link>
      </Stack>

      <Heading size="lg">Currently Reading</Heading>
      <Stack spacing="md" direction={"column"} justify="center" align="center">
        {currentlyReading.map((book, idx) => (
          <>
            <BookItem key={book.guid} book={book} current />
          </>
        ))}
      </Stack>
      <Stack direction="row-reverse">
        <Link href="https://oku.club/user/zaymon/collection/reading">
          See all on Oku
        </Link>
      </Stack>
    </Stack>
  );
};
