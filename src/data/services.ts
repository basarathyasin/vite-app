export interface Service {
  id: number;
  name: string;
  price: string;
}

export const services: Service[] = [
  {
    id: 1,
    name: "Web Development",
    price: "$999",
  },
  {
    id: 2,
    name: "UI/UX Design",
    price: "$499",
  },
  {
    id: 3,
    name: "SEO Optimization",
    price: "$299",
  },
  {
    id: 4,
    name: "Digital Marketing",
    price: "$399",
  },
];