// interfaces usually start with I. Not compulsory but conventional
// interface will describe a structure of Activity object
// interfaces in TypeScript don't appear in the compiled and built JavaScript so code is shorter
// used when we want a strong typing for this project instead of using any which avoid errors and doesn't help
// interfaces are used for type checking
export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    city: string;
    venue: string;
}