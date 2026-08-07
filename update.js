module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: "git pull"
    }
  }, {
    when: "{{exists('app/env')}}",
    method: "fs.rm",
    params: {
      path: "app/env"
    }
  }, {
    method: "script.start",
    params: {
      uri: "torch.js",
      params: {
        venv_python: "3.11",
        venv: "venv",
        path: "app",
        xformers: true
      }
    }
  }, {
    method: "shell.run",
    params: {
      venv: "venv",
      path: "app",
      message: [
        "uv pip install -r requirements.txt --index-strategy unsafe-best-match",
        "uv pip install comtypes"
      ]
    }
  },
  {
    when: "{{platform === 'win32' && gpu === 'amd'}}",
    method: "shell.run",
    params: {
      venv: "venv",
      path: "app",
      message: "uv pip install numpy==1.26.4"
    }
  }]
}
