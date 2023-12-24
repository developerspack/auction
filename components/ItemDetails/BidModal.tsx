interface BidModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
  name: string;
  startingPrice: number;
}

const BidModal = ({
  id,
  name,
  startingPrice,
  open,
  setOpen,
}: BidModalProps) => {
  return <div>BidModal</div>;
};

export default BidModal;
