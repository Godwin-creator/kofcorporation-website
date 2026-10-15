import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    'Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN before running this migration.'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function migrate() {
  console.log('Starting project categories & links migration...');

  const projects = await client.fetch(`*[_type == "project"]{ _id, title, category, categories, url, links }`);
  console.log(`Found ${projects.length} project(s) to check.`);

  for (const proj of projects) {
    const patch: Record<string, unknown> = {};

    // Migrate category -> categories
    if ((!proj.categories || proj.categories.length === 0) && proj.category) {
      patch.categories = [proj.category];
    }

    // Migrate url -> links
    if ((!proj.links || proj.links.length === 0) && proj.url) {
      patch.links = [
        {
          _key: `link-${Date.now()}`,
          type: 'web',
          url: proj.url,
          label: 'Site web',
        },
      ];
    }

    if (Object.keys(patch).length > 0) {
      console.log(`Migrating project "${proj.title}" (${proj._id}):`, patch);
      await client.patch(proj._id).set(patch).commit();
      console.log(`Project "${proj.title}" updated successfully.`);
    } else {
      console.log(`Project "${proj.title}" already up-to-date.`);
    }
  }

  console.log('Migration completed successfully!');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
