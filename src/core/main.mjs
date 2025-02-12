import Character from '../entities/Character.mjs'

const main = async _ => {
	const myChar = new Character()
	myChar.level.emitter.on("level changed", _ => {
		console.log("LEVEL UP!!!")
	})
	myChar.level.experience += 10000
}
main()