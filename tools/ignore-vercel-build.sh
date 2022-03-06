
# Name of the app to check. Change this to your application name!
APP=discover-coffee-stores

# Install @nrwl/workspace in order to run the affected command
yarn install

# Run the affected command, comparing latest commit to the one before that
yarn run nx affected:apps --plain --base HEAD~1 --head HEAD | grep $APP -q

# Store result of the previous command (grep)
IS_AFFECTED=$?

if [ $IS_AFFECTED -eq 1 ]; then
  echo "🛑 - Build cancelled"
  exit 0
elif [ $IS_AFFECTED -eq 0 ]; then
  echo "✅ - Build can proceed"
  exit 1
fi