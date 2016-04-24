import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AppSchema = new Schema({
	creator: {type: Schema.Types.ObjectId, ref: 'User'},
	name: {type: String, required: true},
	url: String,
	rule: String
})

const App = mongoose.model('App', AppSchema)

export default App

