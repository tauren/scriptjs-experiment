{spawn, exec} = require 'child_process'
sys = require 'sys'
smoosh = require 'smoosh'

printOutput = (process) ->
  process.stdout.on 'data', (data) -> sys.print data
  process.stderr.on 'data', (data) -> sys.print data

task 'clean', 'Cleans compiled files from target', ->
  tasks = exec '''
    echo "Cleaning javascript files from target/js"
    rm -rf target/js/*

    echo "Cleaning stylesheet files from target/css"
    rm -rf target/css/*
  '''
  printOutput(tasks)

task 'compile', 'Compiles coffee and stylus files', ->
  tasks = exec '''
    echo "Compiling files in src/coffee to target"
    coffee -o target/js -c src/coffee

    echo "Compiling stylus files in src/stylus"
    stylus -o target/css src/stylus
  '''
  printOutput(tasks)

task 'smoosh', 'Compiles all scripts into downloadable files', ->
  smoosh
    .config('./smoosh.json')  # loads configuration
    .clean()                  # removes dist directory
    .run()                    # runs jshint on full build
    .build()                  # builds both uncompressed and compressed files
    .analyze()                # analyzes all
