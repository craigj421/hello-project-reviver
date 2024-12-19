interface TitleInsuranceDetails {
  sellerPayingTitle: boolean;
  ownersTitleInsurance: number;
}

export const calculateTitleInsurance = (details: TitleInsuranceDetails) => {
  const titleInsuranceAmount = details.sellerPayingTitle ? details.ownersTitleInsurance : 0;
  console.log("Title insurance calculation:", {
    sellerPayingTitle: details.sellerPayingTitle,
    ownersTitleInsurance: details.ownersTitleInsurance,
    finalAmount: titleInsuranceAmount
  });
  return titleInsuranceAmount;
};