const CardItem = ({ label, value }: CardItemProps) => (
  <div>
    <label className="text-xs">{label}</label>
    <p className="font-bold text-sm">{value}</p>
  </div>
);

type CardItemProps = {
  label: string;
  value: string | number;
};

export default CardItem;
