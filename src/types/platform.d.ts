interface IPricing {
  title: string;
  dbValue: string;
  price: number;
  priceString: string;
}

interface IApplication {
  id: string;
  uId?: string;
  isBlocked: boolean;
  status: "REVIEWING" | "REJECTED" | "AWAITING_PAYMENT" | "PAID";
  certificateImgUrl?: string;
  certificateFileUrl?: string;
  businessName: string;
  businessAddress: string;
  businessSector: string;
  businessSize: string;
  businessWebsite?: string;
  businessLogoUrl: string;
  pledgeUrl: string;
  aiPolicyUrl?: string;
  isoCertificationUrl?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  otherInfo: string;
  rejectionReason?: string;
  expiresAt?: string;
}

interface IOtherInfoQuestion {
  dbKey: string;
  question: string;
}

interface IBusiness {
  id: string;
  uId?: string | null;
  certificateImgUrl?: string | null;
  businessName: string;
  businessSector: string;
  businessSize: string;
  businessWebsite?: string | null;
  businessLogoUrl: string;
  aiPolicyUrl?: string | null;
  isoCertificationUrl?: string | null;
  otherInfo: string;
  expiresAt?: string | null;
}
