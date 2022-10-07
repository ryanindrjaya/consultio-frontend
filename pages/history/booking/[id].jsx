import React, { useState } from "react";
import HistoryLayout from "../../../layouts/History";
import { Wizard, useWizard } from "react-use-wizard";
import { AnimatePresence } from "framer-motion";
import BookingStepper from "../../../components/BookingStepper";
import nookies from "nookies";
import { Building4, TextBlock } from "iconsax-react";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";
import StarRatings from "react-star-ratings";
import toast from "react-hot-toast";
import axios from "axios";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const id = ctx.params.id;

  const endpoint = process.env.API_URL + "/booking/" + id;
  const config = {
    method: "GET",
    headers: {
      Authorization: cookies.token,
    },
  };

  const res = await fetch(endpoint, config);
  const data = await res.json();

  return {
    props: {
      data: data.data,
    },
  };
}

export default function History({ data }) {
  const [bookingState, setBookingState] = useState(data);
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null);
  const { role } = cookies;

  console.log(bookingState);

  const CustomTextField = styled(TextField)({
    "& .MuiInputBase-root.Mui-disabled": {
      backgroundColor: "white",
    },
    "& .MuiOutlinedInput-root.Mui-disabled": {
      "& fieldset": {
        borderColor: "#437EEB",
      },
      "&:hover fieldset": {
        borderColor: "#437EEB",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#437EEB",
      },
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      color: "#437EEB",
    },
  });

  const ConsultComponent = () => {
    return (
      <div className="w-full">
        <div className="w-full flex flex-col gap-y-3 items-center">
          <img
            className="w-1/6 h-1/6 object-cover rounded-xl"
            src={`http://203.6.149.156:8480/public/${cookies.role === "USER" ? bookingState?.consultantPhoto : bookingState?.customerPhoto}`}
            alt={cookies.role === "USER" ? "Consultant photo" : "Customer photo"}
          />
          <h1 className="font-poppins font-medium text-2xl">{cookies.role === "USER" ? bookingState.consultantName : bookingState.customerName}</h1>
          <div className="flex align-baseline gap-x-3">
            <Building4 size="32" color="rgba(41, 45, 50,0.6)" />
            <p className="inline" style={{ color: "rgba(41, 45, 50,0.6)" }}>
              {cookies.role === "USER" ? bookingState?.consultantCity : bookingState?.customerCity || "-"}
            </p>
          </div>
        </div>

        <div className="relative p-6 flex-auto">
          <CustomTextField
            label={cookies.role === "USER" ? "Keluh Kesahmu" : "Masalah"}
            className="w-full outline-none"
            placeholder="Ada apa dengan kamu?"
            value={bookingState.problem}
            disabled
            multiline
          />
          <TextBlock size={24} color="#437EEB" className="absolute top-9 right-9" />
        </div>
      </div>
    );
  };

  const SolutionComponent = () => {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const starIcon =
      "M19.45 4.97273L21.9433 9.9594C22.2833 10.6536 23.19 11.3194 23.955 11.4469L28.4741 12.1977C31.3641 12.6794 32.0441 14.7761 29.9616 16.8444L26.4483 20.3577C25.8533 20.9527 25.5275 22.1002 25.7116 22.9219L26.7175 27.2711C27.5108 30.7136 25.6833 32.0452 22.6375 30.2461L18.4016 27.7386C17.6366 27.2852 16.3758 27.2852 15.5966 27.7386L11.3608 30.2461C8.32914 32.0452 6.48747 30.6994 7.28081 27.2711L8.28664 22.9219C8.47081 22.1002 8.14497 20.9527 7.54997 20.3577L4.03664 16.8444C1.96831 14.7761 2.63414 12.6794 5.52414 12.1977L10.0433 11.4469C10.7941 11.3194 11.7008 10.6536 12.0408 9.9594L14.5341 4.97273C15.8941 2.2669 18.1041 2.2669 19.45 4.97273Z";

    async function handleSendReview(e) {
      e.preventDefault();

      console.log("review", review);
      console.log("rating", rating);

      const endpoint = process.env.API_URL + "/booking/" + bookingState.bookingId + "/rating";
      const config = {
        method: "PUT",
        headers: {
          Authorization: cookies.token,
        },
        body: JSON.stringify({
          rating: rating,
          review: review,
        }),
      };

      const res = await fetch(endpoint, config);
      const data = await res.json();

      console.log(data);

      if (data.status === "success") {
        const endpoint = process.env.API_URL + "/booking/" + bookingState.bookingId;
        const config = {
          method: "GET",
          headers: {
            Authorization: cookies.token,
          },
        };

        const res = await fetch(endpoint, config);
        const newData = await res.json();

        if (newData.status === "success") {
          setBookingState(newData.data);
          toast.success("Review berhasil dikirim");
        } else {
          toast.error(newData.message);
        }
      } else {
        toast.error(data.message, {
          position: "top-right",
        });
      }
    }
    return (
      <div className="w-full">
        <div className="w-full flex">
          <div className="w-full flex justify-center lg:w-1/4">
            <img
              className="w-52 h-52 object-cover rounded-xl"
              src={`http://203.6.149.156:8480/public/${bookingState?.consultantPhoto}`}
              alt="Foto konsultan"
            />
          </div>
          <div className="w-full lg:w-3/4">
            <div className="w-full flex flex-col items-center lg:items-start">
              <h1 className="font-poppins font-medium text-2xl">{bookingState.consultantName}</h1>
              <div className="flex mt-2 align-baseline gap-x-3">
                <Building4 size="32" color="rgba(41, 45, 50,0.6)" />
                <p className="inline" style={{ color: "rgba(41, 45, 50,0.6)" }}>
                  {bookingState.consultantCity || "-"}
                </p>
              </div>

              <div className="mt-10 w-full">
                <CustomTextField
                  label="Kesimpulan"
                  className="w-full lg:w-11/12 outline-none"
                  placeholder="Ada apa dengan kamu?"
                  value={bookingState.solution || "Belum ada solusi"}
                  disabled
                  multiline
                  rows={10}
                />
              </div>
            </div>
          </div>
        </div>
        {role === "USER" && (
          <div className="w-full flex flex-col items-center mt-12 mb-6">
            <h1 className="mb-8 font-medium font-poppins text-xl">Bagaimana konsultasi mu?</h1>
            <StarRatings
              starDimension="50px"
              rating={bookingState.rating !== null ? bookingState.rating : rating}
              starRatedColor="#437EEB"
              starHoverColor="rgba(67, 126, 235, 0.5)"
              changeRating={bookingState.rating !== null ? () => {} : setRating}
              numberOfStars={5}
              svgIconPath={starIcon}
              name="rating"
            />

            <div className="w-full lg:w-4/5 mt-5">
              <TextField
                label="Review"
                onChange={(e) => setReview(e.target.value)}
                className="w-full outline-none"
                placeholder="Ketika ulasan kamu disini..."
                value={bookingState.review !== null ? bookingState.review : review}
                multiline
                rows={10}
              />
              <div className="flex justify-end mt-5">
                <button onClick={handleSendReview} className="px-20 py-2 text-white bg-primary rounded-lg">
                  Kirim
                </button>
              </div>
            </div>
          </div>
        )}

        {role !== "USER" && bookingState.rating == null && (
          <div className="w-full flex flex-col items-center mt-12 mb-6">
            <h1 className="mb-8 font-medium font-poppins text-xl">Menunggu ulasan {bookingState.customerName}</h1>
          </div>
        )}
      </div>
    );
  };

  const CompletedComponent = () => {
    return <h1>Hi ini halaman selesai</h1>;
  };

  // function renderBasedOnStatus() {
  //   switch (status) {
  //     case "Active":
  //       return <ConsultComponent />;
  //     case "Waiting for review":
  //       return <SolutionComponent />;
  //     case "Completed":
  //       return <ReviewComponent />;
  //   }
  // }

  return (
    <div className="w-full px-8 py-6">
      <BookingStepper status={bookingState.status} />

      <div className="w-full mt-12">
        {bookingState.status === "Active" ? (
          <ConsultComponent />
        ) : bookingState.status === "Waiting for review" ? (
          <SolutionComponent />
        ) : (
          <CompletedComponent />
        )}
      </div>
    </div>
  );
}

History.layout = HistoryLayout;
