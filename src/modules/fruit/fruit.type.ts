type PatchFruitBody = {
  action: "increment" | "decrement";
};

type PatchFruitParams = {
  id: number;
};

export type { PatchFruitBody, PatchFruitParams };
