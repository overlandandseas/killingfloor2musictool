# Project Demon Hunter Hunter
Simple GUI tool to change and insert your own custom music in Killing Floor 2.  
![Killing Floor Music Tool](https://github.com/overlandandseas/projectdemonhunterhunter/raw/master/assets/github/kf2musictool.png)
### Requirements
+ Killing Floor 2
+ [Wwise Authorization Tools v2015.1.4](https://www.audiokinetic.com/download/?id=2015.1.4_5497) (other versions have been known to work but was developed with *v2015.1.4* in mind)

### Installation
Download from here. Extract to any location and run **KFMusicTool.exe**.

### How to use
**Note**  
It will search for Wwise and Killing Floor 2 installations in the default locations. If you have multiple installations of Wwise or Killing Floor 2 those are not supported at this time.


If it could not find Killing Floor 2 or Wwise please click the button and search for KFGame.exe and Wwise.exe.  
After it finds them it will show the list of songs. Click the button on the right and upload a wav file.  
**WAV FILES ONLY.**  
When you upload a wav file it will start converting it into a wem file. This process takes up to 20 seconds and can only process one file at a time. After that load up Killing Floor 2 and enjoy.

### Development
It was developed on windows and uses specific windows style filepaths. (Backslashes instead of forward slashes).
#### Requirements
+ node v4.2 or higher
+ [electron](https://www.npmjs.com/package/electron-prebuilt)

Clone the repo.  
`git clone projectdemonhunterhunter`

cd into the directory.  
`cd projectdemonhunterhunter`

Install all packages.  
`npm install`

Start the Application.  
`npm start`


Build the Application.  
`npm run build`

### Contributing
When contributing to the repo is always welcome and encouraged. There is currently no eslint or styleguide to follow. Try to see the style of js I have in place.
+ No semi colons.
+ Use `=>` instead of `function` wherever possible.
+ Do not use parenthensis if a function only has one parameter.
+ Try to follow an OO model. If you must make a new file as if It can be abstracted in a class at all.

### License
The actual code in this repo is under the [WTFPL](../master/LICENSE) license, which permits you to `"DO WHAT THE FUCK YOU WANT"`.  However this repo contains Wwise project files which are not distributed under the WTFPL license, they are available for free (nonfree) on their website. This program was also built using electron and was distributed under the MIT license.  

**TLDR:** My shit is free, so is Electron, Wwise is not.


> Copyright © 2016 Lucas Overland <lucas.overland@gmail.com>. This work is free. You can redistribute it and/or modify it under the terms of the Do What The Fuck You Want To Public License, Version 2, as published by Sam Hocevar. See the [LICENSE](../master/LICENSE) file for more details.*
