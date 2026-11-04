import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products?prev=home`);
  };
  return (
    <>
      <div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
          delectus expedita doloribus repellendus molestiae vel dolorem unde
          reprehenderit facere fugiat, quaerat explicabo corporis ipsa modi
          debitis, adipisci excepturi molestias perspiciatis nesciunt
          reiciendis. Exercitationem fugit incidunt repellendus doloribus iste
          fugiat placeat molestiae, obcaecati blanditiis magnam assumenda quidem
          unde autem architecto voluptatem illum expedita inventore reiciendis
          cupiditate a ipsa sint. Eum exercitationem praesentium nisi modi nulla
          repellat numquam amet deserunt optio odio atque quis vel, dolore alias
          laboriosam. Nihil neque voluptatum nostrum rem. Eveniet est veritatis
          labore cupiditate ipsa sit iure facere veniam neque commodi quisquam,
          eligendi nesciunt aliquid, sint eius nostrum!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
          delectus expedita doloribus repellendus molestiae vel dolorem unde
          reprehenderit facere fugiat, quaerat explicabo corporis ipsa modi
          debitis, adipisci excepturi molestias perspiciatis nesciunt
          reiciendis. Exercitationem fugit incidunt repellendus doloribus iste
          fugiat placeat molestiae, obcaecati blanditiis magnam assumenda quidem
          unde autem architecto voluptatem illum expedita inventore reiciendis
          cupiditate a ipsa sint. Eum exercitationem praesentium nisi modi nulla
          repellat numquam amet deserunt optio odio atque quis vel, dolore alias
          laboriosam. Nihil neque voluptatum nostrum rem. Eveniet est veritatis
          labore cupiditate ipsa sit iure facere veniam neque commodi quisquam,
          eligendi nesciunt aliquid, sint eius nostrum!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
          delectus expedita doloribus repellendus molestiae vel dolorem unde
          reprehenderit facere fugiat, quaerat explicabo corporis ipsa modi
          debitis, adipisci excepturi molestias perspiciatis nesciunt
          reiciendis. Exercitationem fugit incidunt repellendus doloribus iste
          fugiat placeat molestiae, obcaecati blanditiis magnam assumenda quidem
          unde autem architecto voluptatem illum expedita inventore reiciendis
          cupiditate a ipsa sint. Eum exercitationem praesentium nisi modi nulla
          repellat numquam amet deserunt optio odio atque quis vel, dolore alias
          laboriosam. Nihil neque voluptatum nostrum rem. Eveniet est veritatis
          labore cupiditate ipsa sit iure facere veniam neque commodi quisquam,
          eligendi nesciunt aliquid, sint eius nostrum!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
          delectus expedita doloribus repellendus molestiae vel dolorem unde
          reprehenderit facere fugiat, quaerat explicabo corporis ipsa modi
          debitis, adipisci excepturi molestias perspiciatis nesciunt
          reiciendis. Exercitationem fugit incidunt repellendus doloribus iste
          fugiat placeat molestiae, obcaecati blanditiis magnam assumenda quidem
          unde autem architecto voluptatem illum expedita inventore reiciendis
          cupiditate a ipsa sint. Eum exercitationem praesentium nisi modi nulla
          repellat numquam amet deserunt optio odio atque quis vel, dolore alias
          laboriosam. Nihil neque voluptatum nostrum rem. Eveniet est veritatis
          labore cupiditate ipsa sit iure facere veniam neque commodi quisquam,
          eligendi nesciunt aliquid, sint eius nostrum!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
          delectus expedita doloribus repellendus molestiae vel dolorem unde
          reprehenderit facere fugiat, quaerat explicabo corporis ipsa modi
          debitis, adipisci excepturi molestias perspiciatis nesciunt
          reiciendis. Exercitationem fugit incidunt repellendus doloribus iste
          fugiat placeat molestiae, obcaecati blanditiis magnam assumenda quidem
          unde autem architecto voluptatem illum expedita inventore reiciendis
          cupiditate a ipsa sint. Eum exercitationem praesentium nisi modi nulla
          repellat numquam amet deserunt optio odio atque quis vel, dolore alias
          laboriosam. Nihil neque voluptatum nostrum rem. Eveniet est veritatis
          labore cupiditate ipsa sit iure facere veniam neque commodi quisquam,
          eligendi nesciunt aliquid, sint eius nostrum!
        </p>
        <button
          className="bg-orange-500 text-white px-2 py-0.5 rounded-md"
          onClick={handleClick}
        >
          Go to Product Page
        </button>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
          delectus expedita doloribus repellendus molestiae vel dolorem unde
          reprehenderit facere fugiat, quaerat explicabo corporis ipsa modi
          debitis, adipisci excepturi molestias perspiciatis nesciunt
          reiciendis. Exercitationem fugit incidunt repellendus doloribus iste
          fugiat placeat molestiae, obcaecati blanditiis magnam assumenda quidem
          unde autem architecto voluptatem illum expedita inventore reiciendis
          cupiditate a ipsa sint. Eum exercitationem praesentium nisi modi nulla
          repellat numquam amet deserunt optio odio atque quis vel, dolore alias
          laboriosam. Nihil neque voluptatum nostrum rem. Eveniet est veritatis
          labore cupiditate ipsa sit iure facere veniam neque commodi quisquam,
          eligendi nesciunt aliquid, sint eius nostrum!
        </p>
      </div>
    </>
  );
}
