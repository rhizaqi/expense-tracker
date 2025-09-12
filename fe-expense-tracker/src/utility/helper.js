import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,5})$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) {
    return "";
  }

  const words = name.split(" ");

  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formatedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formatedInteger}.${fractionalPart}`
    : formatedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
    month: moment(item?.date).format("Do MMM YYYY"),
    // use moment with ("Do MMM YYYY")
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

// {
//   return {
//     month: moment(item?.date).format("Do MMM YYYY"),
//     amount: item.amount,
//     source: item.source,
//   };
// } << this is explicit return since i use curly braces so i have to write return so it do the return, but if i use parentheses its more common in map since it implicit-ly return

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  console.log(sortedData,`???`);
  

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));

  console.log(chartData,`data chart`);
  

  return chartData;
};
