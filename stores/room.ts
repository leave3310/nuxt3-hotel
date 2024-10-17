import { defineStore } from "pinia";
import dayjs from "dayjs";

interface ReservationDate {
  checkInDate: Date;
  checkOutDate: Date;
}

export const useRoomStore = defineStore("room", () => {
  const checkInOutDay = ref<ReservationDate>({
    checkInDate: dayjs().add(1, "day").toDate(),
    checkOutDate: dayjs().add(2, "day").toDate(),
  });
  const updateCheckInOutDay = (range: ReservationDate) => checkInOutDay.value = range;

  const reservationPeople = ref(2);
  const updateReservationPeople = (people: number) => reservationPeople.value = people;

  const bookRoomID = ref();
  const updateBookRoomID = (id: string) => bookRoomID.value = id;

  return {
    checkInOutDay,
    updateCheckInOutDay,

    reservationPeople,
    updateReservationPeople,

    bookRoomID,
    updateBookRoomID,
  };
});
