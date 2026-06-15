export function filterDeclarations(
    module: {
        declarations: Record<string, any>;
    },
    filter: (declaration: any) => boolean
) {
    for(const key in module.declarations) {
        const declaration = module.declarations[key];
        if(filter(declaration)) return declaration;
    }
    return null;
}