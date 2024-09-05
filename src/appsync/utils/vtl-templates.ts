export const oneQueryResult = `
    #if($ctx.result.items.size() > 0)
        $util.toJson($ctx.result.items[0])
    #else
        $util.toJson(null)
    #end
`