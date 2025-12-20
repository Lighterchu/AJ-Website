import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ReviewsPage() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const role = user.publicMetadata?.role as string | undefined;
  const isAdmin = role === "admi";

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">
            {isAdmin ? "Content Reviews" : "Your Reviews"}
          </h1>
          <p className="text-gray-400 mt-1">
            {isAdmin
              ? "Approve or reject submitted content"
              : "Track the status of your submissions"}
          </p>
        </div>

        {/* Non-admin notice */}
        {!isAdmin && (
          <div className="border border-yellow-400/30 bg-yellow-400/10 rounded-xl p-6">
            <p className="text-yellow-400 font-semibold">
              Your submissions require admin approval before going live.
            </p>
          </div>
        )}

        {/* Review list placeholder */}
        <div className="space-y-4">
          <div className="border border-white/10 rounded-xl p-6 flex justify-between items-center">
            <div>
              <p className="font-semibold">Example Post Title</p>
              <p className="text-gray-400 text-sm">
                Submitted on 12 Dec 2025
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-400">
              Pending
            </span>
          </div>

          {isAdmin && (
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-500 text-black rounded font-semibold hover:bg-green-400">
                Approve
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-400">
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
