import Counter from "@/components/Counter/Counter";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

export default function ProductPage() {
  return (
    <div>
      <Counter>
        <ComponentA />
      </Counter>
      <h1>Product Page</h1>
      <SubmitButton />
    </div>
  );
}
