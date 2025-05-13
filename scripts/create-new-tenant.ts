import { createClub } from "./create-club";
import { createTenant } from "./create-tenant";

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
        '33342822-40c1-703d-aeb2-7a259a5892b4',
        "Club",
        "0544452263",
        "netanel.amor@gmail.com"
    )
}

main();