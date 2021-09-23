interface Props {
  title: string;
}

const SmallCard = ({ title }: Props) => {
  return (
    <div className="flex flex-grow items-center p-4 my-1 shadow-md rounded">
      <p className="text-base">{title}</p>
    </div>
  );
};

export default SmallCard;
