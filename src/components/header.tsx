import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 flex gap-4">
      <Button asChild>
        <Link className="px-4 py-2" href={`/`}>
          Корабль
        </Link>
      </Button>
      <Button asChild>
        <Link className="px-4 py-2" href={`/resoures`}>
          Ресурсы
        </Link>
      </Button>
      <Button asChild>
        <Link className="px-4 py-2" href={`/resoures-types`}>
          Типы ресурсов
        </Link>
      </Button>
      <Button asChild>
        <Link className="px-4 py-2" href={`/mission-members`}>
          Участники миссий
        </Link>
      </Button>
      <Button asChild>
        <Link className="px-4 py-2" href={`/experiments`}>
          Экперименты
        </Link>
      </Button>
      <Button asChild>
        <Link className="px-4 py-2" href={`/crew-members`}>
          Участники команды
        </Link>
      </Button>
      <Button asChild>
        <Link className="px-4 py-2" href={`/resources-logs`}>
          Логи ресурсов
        </Link>
      </Button>
    </header>
  );
};

export default Header;
