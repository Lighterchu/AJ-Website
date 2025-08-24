export default function SanityDocs() {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 text-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-green-400">Sanity CMS Guide</h1>
        <p className="mb-10 text-lg text-gray-300">
          This guide shows you how to log in, create, and manage content in Sanity Studio for your
          website.
        </p>
  
        {/* Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3 text-green-300">1. Log in to Sanity Studio</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Go to <span className="text-green-400">https://yourproject.sanity.studio</span></li>
            <li>Sign in with your Google account (or whichever method you were given).</li>
            <li>Once logged in, you’ll see the Studio dashboard with different content types.</li>
          </ul>
        </section>
  
        {/* Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3 text-green-300">2. Adding New Content</h2>
          <p className="mb-4">To add new content (like blog posts, events, or products):</p>
          <ul className="list-decimal list-inside space-y-2 text-gray-300">
            <li>In the left sidebar, choose the document type (e.g., <strong>Blog Post</strong>).</li>
            <li>Click <span className="text-green-400">“Create new”</span>.</li>
            <li>Fill in the fields: Title, Slug, Content, Images, etc.</li>
            <li>Click <span className="text-green-400">“Publish”</span> in the top right.</li>
          </ul>
        </section>
  
        {/* Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3 text-green-300">3. Editing Existing Content</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Select the document type from the sidebar.</li>
            <li>Click the item you want to edit.</li>
            <li>Update the fields as needed.</li>
            <li>Press <span className="text-green-400">“Publish”</span> to save changes.</li>
          </ul>
        </section>
  
        {/* Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3 text-green-300">4. Uploading Images</h2>
          <p className="mb-4">When you see an image field:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Click <span className="text-green-400">“Upload”</span> to choose a file.</li>
            <li>Or select from previously uploaded assets.</li>
            <li>Images are automatically optimized when displayed on the website.</li>
          </ul>
        </section>
  
        {/* Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3 text-green-300">5. Preview & Publishing</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Check your draft using the <strong>Preview</strong> option (if enabled).</li>
            <li>When you’re ready, hit <span className="text-green-400">“Publish”</span>.</li>
            <li>Your changes will appear on the live website within a few minutes.</li>
          </ul>
        </section>
  
        <footer className="mt-16 pt-6 border-t border-gray-700 text-sm text-gray-400">
          Need more help? Contact <span className="text-green-400">support@yourdomain.com</span>
        </footer>
      </main>
    );
  }
  