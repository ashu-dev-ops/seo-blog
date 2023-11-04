import Image from "next/image";
import React from "react";
const getData = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5"
  );
  return res.json();
};
const getDynamicImage = async () => {
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    // fetch new every time
    cache: "no-store",
    // next: {
    //   revalidate: 10,
    // },
  });
  return res.json();
};
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export default async function Page() {
  // const data] = await getData();
  const [data, dog] = await Promise.all([getData(), getDynamicImage()]);
  console.log(data);
  return (
    <>
      <Image src={dog.message} alt="dog" width={300} height={400}/>
      <ul>
        {data.map((i: Post,idx:any) => (
          <li key={idx}>{i.title}</li>
        ))}
      </ul>
    </>
  );
}
