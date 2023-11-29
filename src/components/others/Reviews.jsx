import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import no_review from "../../assets/no-review.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Reviews = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/user/reviews/${id}`);
      return res?.data;
    },
  });
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-spinner w-40 py-52 bg-yellow-500"></span>
      </div>
    );
  }

  return (
    <div className="pb-14">
      {reviews?.length === 0 ? (
        <img src={no_review} alt="no_review" className="w-3/4 mx-auto" />
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 1000, disableOnInteraction: true }}
          loop
        >
          {reviews?.map((review) => (
            <SwiperSlide key={review._id} className="border">
              <div className="flex flex-col items-center mt-6 md:px-20 space-y-4">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review?.ratting}
                  readOnly
                />
                <img src={review?.image} alt="{review?.name}" />
                <div className="text-center space-y-1 pb-6">
                  <h1 className="uppercase font-bold text-yellow-500">
                    {review?.name}
                  </h1>
                  <p className="text-xs md:text-base">{review?.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Reviews;
