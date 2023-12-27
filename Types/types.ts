interface itemProps {
  id: string;
  Name: string;
  Thumbnail: string;
  video: string;
  otherImages: string[];
  bidding: boolean;
  Description: string;
  expiryDate: string;
  userId: string;
  startingPrice: number;
  BidAccepted: boolean;
}

interface userProps {
  isLoggedIn: boolean;
  id: string;
  email: string;
  Name: string;
  photo: string;
  createdAt: string;
}

interface bidProps {
  id: string;
  userName: string;
  userEmail: string;
  userPhoto: string;
  userId: string;
  bid: number;
  ItemId: string;
  BidStatus: boolean;
  createdAt: string;
}
