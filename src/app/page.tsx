import { SpacecraftCard } from "@/components/spacecraft-card";
import { spacecraftService } from "@/services/spacecraft";

export default async function Home() {
  const spacecrafts = await spacecraftService.getAll();
  console.log(spacecrafts);
  return (
    <section className="p-4">
      <h1 className="font-bold text-3xl">Корабли</h1>

      <div className="w-full my-8 h-0.5 bg-black/10" />

      {spacecrafts.map((s) => (
        <SpacecraftCard key={s.id} data={s} />
      ))}
    </section>
  );
}
