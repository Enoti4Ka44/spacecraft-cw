import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={onClick} variant="outline" className="p-2">
      <Trash2 className="bg-tomato-100" /> Удалить
    </Button>
  );
};

export default DeleteButton;
