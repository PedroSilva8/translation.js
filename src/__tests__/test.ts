import TranslationJS, { T } from '../index'

test('Main', () => {

    TranslationJS.LoadTranslation("pt", { teste: { js: "Teste" } }, true)
    TranslationJS.LoadTranslation("en", JSON.parse('{ "nome": "name", "user": { "password": "guest" } }'))

    expect(T("teste.js")).toStrictEqual("Teste")
    expect(T("teste.js2")).toStrictEqual("teste.js2")

    TranslationJS.SelectTrans("en")
    expect(T("nome")).toStrictEqual("name")
    expect(T("user.password")).toStrictEqual("guest")
    expect(T("user.password2")).toStrictEqual("user.password2")
})