import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen " >
        <h1 className="text-center text-3xl my-7 font-semibold" >Create a question</h1>
        <form className="flex flex-col gap-4">
        <TextInput type="text" placeholder="Topic" required id="topic" className="flex-1 "/>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type="text" placeholder="Problem" required id="title" className="flex-1 "/>
                <Select>
                    <option value="uncategorized">Select a platform</option>
                    <option value="leetcode">Leetcode</option>
                    <option value="geekForGeeks">GeekForGeeks</option>
                    <option value="codeforces">codeforces</option>
                </Select>
                <Select>
                    <option value="uncategorized">Select Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </Select>
            </div>
            <div className="flex gap=4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput type='file' accept="image/*" />
                <Button type="button" gradientDuoTone="purpleToBlue" size="sm" outline>
                    Upload Image
                </Button>
            </div>
            <ReactQuill  theme="snow" placeholder="write Something" className="h-72 mb-12" />
            <TextInput type="text" placeholder="Youtube Link" required id="youtube" className="flex-1 "/>
            <TextInput type="text" placeholder="Question Link" required id="question" className="flex-1 "/>
            <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
        </form>
        
    </div>
  )
}
