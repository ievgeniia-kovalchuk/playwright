export class Transformers{

    static replaceSpacesWithDashes(name: string) {
        if (name.includes(' ')) {
            let regex = /\s/gi
            name = name.replace(regex, '-')
        }
        return name
    }
}