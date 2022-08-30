import { User } from "iconsax-react";
import React from "react";
import FormInput from "../../components/Inputs/FormInput";
import { IOSSwitch } from "../../components/Switch";
import Home from "../../layouts/Home";

export default function Profile() {
  return (
    <div className="container-lg h-100 mx-auto w-3/4 mt-10 relative">
      <div className="w-full relative">
        <img
          src="/banner.png"
          className="w-full h-50 object-cover object-bottom"
        />

        <img
          src="/default.png"
          className="absolute left-20 -bottom-20 object-cover object-center w-40 h-48 rounded-xl"
        />
      </div>

      <div className="mt-28">
        <div className="w-full flex mb-10">
          <div className="w-1/2 mx-2">
            <FormInput
              type="text"
              label="Full Name"
              // handleChange={handleNameInput}
              // value={fullname}
              icon={<User className="text-gray-400 w-4" />}
            />
          </div>
          <div className="w-1/2 mx-2">
            <FormInput
              type="text"
              label="City"
              // handleChange={handleNameInput}
              // value={fullname}
              icon={<User className="text-gray-400 w-4" />}
            />
          </div>
        </div>

        <div className="w-full flex mb-10">
          <div className="w-1/2 mx-2">
            <FormInput
              type="text"
              label="Address"
              // handleChange={handleNameInput}
              // value={fullname}
              icon={<User className="text-gray-400 w-4" />}
            />
          </div>
          <div className="w-1/2 mx-2">
            <FormInput
              type="text"
              label="Phone"
              // handleChange={handleNameInput}
              // value={fullname}
              icon={<User className="text-gray-400 w-4" />}
            />
          </div>
        </div>

        <div className="w-full flex mb-10">
          <div className="w-1/2 mx-2">
            <span className="flex">
              <p style={{ marginBottom: 0, marginRight: "10px" }}>
                Private Profile
              </p>
              <IOSSwitch />
            </span>
          </div>
        </div>
      </div>

      <div className="w-40 absolute right-0">
        <div className="w-full justify-center px-5 py-3 cursor-pointer rounded-lg duration-150 text-white bg-blue-500 hover:bg-blue-600 flex items-center">
          Submit
        </div>
      </div>
    </div>
  );
}

Profile.layout = Home;
