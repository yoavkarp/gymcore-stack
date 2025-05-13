import { createClub } from "./create-club";

async function main() {
    // const tenantId = await createTenant(
    //     "SpinPlus",
    //     "0505716749",
    //     "dev@pumpapp.app"
    // )

    // console.log("Tenant ID: ", tenantId);

    // now create the tenant in the database
    // and after

    const club = await createClub(
        "Club",
        "0544452263",
        "netanel.amor@gmail.com"
    )
}

main();