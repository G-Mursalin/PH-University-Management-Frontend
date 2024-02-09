export const semesterOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

export const semesterRegistrationYearsOptions = [0, 1, 2, 3, 4].map(
  (number) => ({
    value: String(new Date().getFullYear() + number),
    label: String(new Date().getFullYear() + number),
  })
);

export const semesterStatusOptions = [
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "ENDED", label: "Ended" },
];
