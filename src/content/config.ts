import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		date: z.string(),
		readTime: z.string(),
		category: z.enum(["All", "Posts", "Notes", "Tutorials", "Deep Dives", "Challenges"]),
		excerpt: z.string(),
		cover: image().optional(),
	}),
});

export const collections = { blog };
