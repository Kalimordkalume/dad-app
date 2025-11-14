import {supabase} from "./scripts/supabaseClient";


export async function registerUser(email: string, password: string) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;

        return { success: true, user: data.user };
    } catch (err: any) {
        console.error("Error al registrar:", err.message);
        return { success: false, error: err.message };
    }
}

export async function loginUser(email: string, password: string) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error("Error login:", error.message);
        return { success: false, error: error.message };
    }

    return {
        success: true, user: data.user
    }

}