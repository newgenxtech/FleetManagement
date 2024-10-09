// import { AppDataSource } from "../data-source";
// import { User } from "../entity/User";

// export const userRepository = AppDataSource.getRepository(User);

// // Raw SQL Example: Get user by ID using raw SQL
// export const getUserByIdRawSQL = async (id: number) => {
//     const rawSQL = `
//         SELECT * 
//         FROM user 
//         WHERE id = $1
//     `;
//     return await AppDataSource.query(rawSQL, [id]); // Using $1 as a parameter placeholder
// };

// // Raw SQL Example: Insert user using raw SQL
// export const createUserRawSQL = async (firstName: string, lastName: string, age: number) => {
//     const rawSQL = `
//         INSERT INTO user (firstName, lastName, age)
//         VALUES ($1, $2, $3)
//         RETURNING *
//     `;
//     return await AppDataSource.query(rawSQL, [firstName, lastName, age]);
// };
