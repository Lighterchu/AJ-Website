import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const role = user.publicMetadata?.role as string | undefined;
  const isAdmin = role === "admi";
  const tags = user.publicMetadata?.tags as string[] | undefined;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Profile</h1>
          <p className="text-gray-400 mt-1">
            Manage your posts and account activity
          </p>
        </div>

        {/* User Card */}
        <div className="border border-white/10 rounded-xl p-6 bg-black">
          <p className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-400 text-sm">{user.emailAddresses[0]?.emailAddress}</p>

          <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">
            {isAdmin ? "Admin" : "Community Poster"}
          </span>
          {isAdmin && (
            
            <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400">  
              Super Admin
              </span>
            )}
          <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
            {isAdmin ? "Admin" : "Venu Owner"}
          </span>
          <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
            {isAdmin ? "Admin" : "DJ"}
          </span>
        </div>

        {/* Non-admin notice */}
        {!isAdmin && (
          <div className="border border-yellow-400/30 bg-yellow-400/10 rounded-xl p-6">
            <h2 className="text-yellow-400 font-semibold text-lg">
              Post Approval Required
            </h2>
            <p className="text-gray-300 mt-2">
              Any post you submit will be reviewed by an admin before being published.
            </p>
          </div>
        )}

        {/* My Posts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">My Posts</h2>

          <div className="border border-white/10 rounded-xl p-6 text-gray-400">
            {/* Replace later with real posts */}
            You haven’t created any posts yet.
          </div>
        </section>

        {/* Admin-only section */}
        {isAdmin && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-400">
              Admin Review
            </h2>

            <div className="border border-green-500/20 rounded-xl p-6 bg-green-500/5">
              <p className="text-gray-300">
                Review and approve community submissions.
              </p>

              <button className="mt-4 px-4 py-2 bg-green-500 text-black rounded font-semibold hover:bg-green-400">
                View Pending Posts
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
