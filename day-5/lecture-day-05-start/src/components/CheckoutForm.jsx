import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../schemas/checkout.js";
import { useCart } from "../context/CartContext.jsx";

function CheckoutForm() {
  const { totalPrice, clear } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(checkoutSchema), mode: "onChange" });

  const onSubmit = async (data) => {
    console.log(data);
    clear();
  };

  const input = "border p-2 rounded w-full";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-2">
      <input {...register("name")} placeholder="ชื่อ-นามสกุล" className={input} />
      {errors.name && (
        <p className="text-red-600 text-sm">{errors.name.message}</p>
      )}

      <input {...register("email")} placeholder="อีเมล" className={input} />
      {errors.email && (
        <p className="text-red-600 text-sm">{errors.email.message}</p>
      )}

      <input {...register("phone")} placeholder="เบอร์โทร เช่น 0812345678" className={input} />
      {errors.phone && (
        <p className="text-red-600 text-sm">{errors.phone.message}</p>
      )}

      <textarea {...register("address")} placeholder="ที่อยู่จัดส่ง" rows={3} className={input} />
      {errors.address && (
        <p className="text-red-600 text-sm">{errors.address.message}</p>
      )}

      <p>ยอดชำระ {totalPrice} บาท</p>
      <button
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "กำลังส่ง..." : "สั่งซื้อ"}
      </button>
    </form>
  );
}
export default CheckoutForm;
