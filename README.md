# thundervision
<b>Purpose:
To provide a fast and easy way to create, populate, and name new project directories in a consistent fashion. Projects in this case refers specifically to the video production projects started by the Thundervision department of the Denver Broncos.</b>

This application works identically on macOS and Windows (tested on macOS 10.14 and Windows 10 1793).

Template projects are copied from a custom template directory ('tv project templates/') upon project creation. These base templates can be fully customized.

Previous settings are saved via a small .json text document in the default location for app data. Admin privileges are needed for this functionality.

There is no user-facing option for changing the project directories, i.e. how many folders, names of folders, etc. This can be easily adjusted in the renderer.js file.

This application is built on the node.js and electron frameworks, and is packaged with electron-packager.

Feel free to request useful features, or fork and start your own version. :)
