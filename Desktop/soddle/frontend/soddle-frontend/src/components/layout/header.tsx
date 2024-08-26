import Link from "next/link";
import Container from "./container";
import Image from "next/image";

export default function Header() {
  return (
    <header className="pt-4">
      <Container className="relative w-full h-[10vh] ">
        <Link href={"/"}>
          <Image src={"/main_logo.svg"} alt="Soddle Logo" fill priority />
        </Link>
      </Container>
    </header>
  );
}
