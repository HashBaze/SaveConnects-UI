import React from "react";

export const FeedBacks: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto flex mt-10 mb-10">
        <div className="m-auto flex justify-center">
          <h2 className="text-3xl font-bold text-center mb-8">
            Hear from Our Happy Users.
          </h2>
          <img
            src="/icon/user.svg"
            alt="Quote"
            className=" w-7 h-7 mt-1 ms-3"
          />
        </div>
      </div>
      <div  className="container mx-auto">
        <div className="grid grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2 sm:grid-rows-2">

          <div className="p-4 rounded-md shadow-lg hover:shadow-gray-300">
            <div className="flex justify-around p-10">
              <img
                className="h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              ></img>
              <p className="text-[14px] w-2/3 text-gray-400">
                “Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat
                cupida non proident sunt in culpa qui officia deserunt.”
              </p>
            </div>
            <div className="flex justify-end">
              <h3 className="text-[14px] font-sans">John Doe</h3>
            </div>
          </div>
          <div className="p-4 rounded-md shadow-lg hover:shadow-gray-300">
            <div className="flex justify-around p-10">
              <img
                className="h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              ></img>
              <p className="text-[14px] w-2/3 text-gray-400">
                “Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat
                cupida non proident sunt in culpa qui officia deserunt.”
              </p>
            </div>
            <div className="flex justify-end">
              <h3 className="text-[14px] font-sans">John Doe</h3>
            </div>
          </div>
          <div className="p-4 rounded-md shadow-lg hover:shadow-gray-300">
            <div className="flex justify-around p-10">
              <img
                className="h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              ></img>
              <p className="text-[14px] w-2/3 text-gray-400">
                “Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat
                cupida non proident sunt in culpa qui officia deserunt.”
              </p>
            </div>
            <div className="flex justify-end">
              <h3 className="text-[14px] font-sans">John Doe</h3>
            </div>
          </div>
          <div className="p-4 rounded-md shadow-lg hover:shadow-gray-300">
            <div className="flex justify-around p-10">
              <img
                className="h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              ></img>
              <p className="text-[14px] w-2/3 text-gray-400">
                “Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat
                cupida non proident sunt in culpa qui officia deserunt.”
              </p>
            </div>
            <div className="flex justify-end">
              <h3 className="text-[14px] font-sans">John Doe</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
