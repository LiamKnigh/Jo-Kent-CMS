import { list } from "@keystone-6/core";
import { text, password, timestamp } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";

type Session = {
    data: {
        name: string;
    }
}

const loggedIn = ({ session }: { session?: Session }) => Boolean(session)

export const lists: Lists = {
    User: list({
        access: {
            operation: {
                query: loggedIn,
                create: loggedIn,
                update: loggedIn,
                delete: loggedIn
            }
        },
        fields: {
            name: text({ validation: { isRequired: true } }),
            email: text({
                validation: { isRequired: true },
                isIndexed: "unique",
            }),
            password: password({ validation: { isRequired: true } }),
            createdAt: timestamp({
                defaultValue: { kind: "now" },
            }),
        },
    }),
};
