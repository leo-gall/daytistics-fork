import { serverSupabaseServiceRole } from '#supabase/server';
import { handleSignUp } from '~/server/handlers/auth';

export default defineEventHandler(async (event) => {
    const adminClient = serverSupabaseServiceRole(event);

    await handleSignUp(adminClient, await readBody(event));

    setResponseStatus(event, 201);
});

// <ul>
// <li v-for="item in items" :key="item.id">{{ item.name }}</li>
//
