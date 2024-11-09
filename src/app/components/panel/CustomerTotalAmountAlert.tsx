import { FaSmile, FaFrown, FaHandHoldingUsd } from 'react-icons/fa';

export default function TotalAmountAlert({ totalGetFromCustomer }: any) {
  const renderAlert = () => {
    if (totalGetFromCustomer < 0) {
      return (
        <div
          role="alert"
          className="bg-blue-200 dark:bg-blue-800 border-l-4 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-100 p-3 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300"
        >
          <FaFrown className="text-blue-700 dark:text-blue-300 h-6 w-6" />
          <p className="text-md font-semibold">{`Rs. ${Math.abs(totalGetFromCustomer)} dene hai`}</p>
        </div>
      );
    }

    if (totalGetFromCustomer > 0) {
      return (
        <div
          role="alert"
          className="bg-red-200 dark:bg-red-800 border-l-4 border-red-600 dark:border-red-500 text-red-900 dark:text-red-100 p-3 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300"
        >
          <FaHandHoldingUsd className="text-red-700 dark:text-red-300 h-6 w-6" />
          <p className="text-md font-semibold">{`Rs. ${totalGetFromCustomer} lene hain!`}</p>
        </div>
      );
    }

    return (
      <div
        role="alert"
        className="bg-green-200 dark:bg-green-800 border-l-4 border-green-600 dark:border-green-500 text-green-900 dark:text-green-100 p-3 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300"
      >
        <FaSmile className="text-green-700 dark:text-green-300 h-6 w-6" />
        <p className="text-md font-semibold">Sab kuch thek hai, Clear</p>
      </div>
    );
  };

  return (
    <div className="text-md rounded-2xl flex items-center justify-center px-1">
      <strong className="block">{renderAlert()}</strong>
    </div>
  );
}
