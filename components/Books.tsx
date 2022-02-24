import { useEffect, useState } from "react";
import convert from "xml-js";
import { Padding, Panel } from "../pages";
import { Heading, Link, Text } from "./Typography";
import { styled } from "../Stitches";
import Stack from "./Stack";
import { formatDistance } from "date-fns";

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
    .then((data) => data.slice(0, 5))
    .then((data) => data.map(rssItemToBook));
};

const useBooks = () => {
  const [read, setRead] = useState<Book[]>([]);
  const [currentlyReading, setCurrentlyReading] = useState<Book[]>([]);

  useEffect(() => {
    loadBooksFromRss("https://oku.club/rss/collection/TsUf5").then(setRead);
    loadBooksFromRss("https://oku.club/rss/collection/j7MJU").then(
      setCurrentlyReading
    );
  }, [setRead, setCurrentlyReading]);

  return { read, currentlyReading };
};

const StyledBookItem = styled("div", {
  textAlign: "center",
});

const VerticalRuler = styled("div", {
  width: 2,
  height: 24,
  background: "white",
  padding: 0,
});

const BookItem = ({ book, current }: { book: Book; current?: boolean }) => {
  const { title, author, readDate } = book;
  return (
    <StyledBookItem>
      <Heading>{title}</Heading>
      <Text fontSize="sm">
        {book.author}. {current ? "Added" : "Finished"}{" "}
        {formatDistance(new Date(book.readDate), new Date())} ago.
      </Text>
    </StyledBookItem>
  );
};

export const Books = () => {
  const { read, currentlyReading } = useBooks();

  return (
    <Stack direction="column">
      <Heading size="lg">Recently finished</Heading>
      <Stack
        spacing="none"
        direction={"column"}
        justify="center"
        align="center"
      >
        {read.map((book, idx) => (
          <>
            <BookItem key={book.guid} book={book} />
            {idx !== read.length - 1 && <VerticalRuler />}
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
