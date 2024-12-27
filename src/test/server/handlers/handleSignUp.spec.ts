import { describe, it, expect, vi } from 'vitest';
import { SupabaseClient } from '@supabase/supabase-js';
import { handleSignUp } from '~/server/handlers/auth';

describe('handleSignUp', () => {
    it('should sign up a user', async () => {
        const mockSupabaseClient = {
            auth: {
                signUp: vi.fn().mockResolvedValue({}),
            },
        } as unknown as SupabaseClient;

        const input = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'StrongP@ssw0rd',
        };

        await handleSignUp(mockSupabaseClient, input);

        expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
            email: input.email,
            password: input.password,
            options: {
                data: {
                    display_name: input.username,
                },
            },
        });
    });

    it('should throw an error if Supabase sign-up fails', async () => {
        const mockSupabaseClient = {
            auth: {
                signUp: vi.fn().mockResolvedValue({
                    error: { message: 'Internal server error' },
                }),
            },
        } as unknown as SupabaseClient;

        const input = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'StrongP@ssw0rd',
        };

        await expect(handleSignUp(mockSupabaseClient, input)).rejects.toThrowError(
            'Internal server error'
        );

        expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
            email: input.email,
            password: input.password,
            options: {
                data: {
                    display_name: input.username,
                },
            },
        });
    });

    it('should throw a validation error for invalid input', async () => {
        const mockSupabaseClient = {
            auth: {
                signUp: vi.fn(),
            },
        } as unknown as SupabaseClient;

        const invalidInput = {
            username: 't',
            email: 'invalidemail',
            password: 'weakpassword',
        };

        await expect(handleSignUp(mockSupabaseClient, invalidInput)).rejects.toThrowError(
            'Schema validation error'
        );

        expect(mockSupabaseClient.auth.signUp).not.toHaveBeenCalled();
    });
});
