import { Button } from "flowbite-react";

// eslint-disable-next-line react/prop-types
export default function ContestCard({contest}) {
    console.log(contest);

    const handleClickContest = () => {
        window.open(contest.contestUrl, '_blank');
      };

    const handleClickCalender = () => {
        const startDate = new Date(contest.contestStartDate).toISOString().split('T')[0];
        const startTime = new Date(contest.contestStartDate).toLocaleTimeString('en-GB');
        const endTime = new Date(new Date(contest.contestStartDate).getTime() + contest.contestDuration * 1000).toLocaleTimeString('en-GB');
        const title = contest.contestName;
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startDate}T${startTime}%2F${startDate}T${endTime}&details=&location=&sf=true&output=xml&title=${title}`;
        window.open(url, '_blank');
      };
    
      return (
        <div className="bg-slate-200 w-[90%] sm:w-[80%] md:w-[60%] text-center mx-auto mt-4 p-6 rounded-xl shadow-lg flex flex-col gap-4 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
          {/* Contest Name */}
          <div className="font-bold text-lg text-gray-700">
            {contest.contestName}
          </div>
          
          {/* Platform */}
          <div className="text-gray-600">
            Platform: <i className="text-gray-700">{contest.platform}</i>
          </div>
          
          {/* Date and Duration */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mx-[5%] text-gray-600">
            <div>
              <span className="font-semibold text-gray-700">Date:</span> {new Date(contest.contestRegistrationEndDate).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Duration:</span> {contest.contestDuration / 60} min
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-evenly items-center gap-4 sm:gap-2 mx-[5%]">
            <Button
              onClick={handleClickContest}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg w-full sm:w-auto"
            >
              Register
            </Button>
            <Button
              onClick={handleClickCalender}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg w-full sm:w-auto"
            >
              Add to Calendar
            </Button>
          </div>
        </div>
      );
      
}
